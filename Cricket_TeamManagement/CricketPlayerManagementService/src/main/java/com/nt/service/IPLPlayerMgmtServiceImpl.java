package com.nt.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.nt.advice.PlayerNotFoundException;
import com.nt.entity.IPLPlayer;
import com.nt.entity.IPLTeam;
import com.nt.repository.IPLPlayerRepository;
import com.nt.repository.IPLTeamRepository;
import com.nt.vo.IPLPlayerVO;
import com.nt.vo.IPLTeamVO;

import lombok.extern.slf4j.Slf4j;

@Service("playerService")
@Slf4j
public class IPLPlayerMgmtServiceImpl implements IPLPlayerMgmtService {
	@Autowired
	private IPLPlayerRepository playerRepo;
	@Autowired
	private IPLTeamRepository teamRepo;

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public String registerPlayer(IPLPlayerVO playerVO) {
		System.out.println("PlayerVO::" + playerVO + " " + playerVO.getTeam());
		log.info("registerPlayer(-) method");
		log.debug("Converting VO obj to Entity object");
		IPLPlayer entity = new IPLPlayer();
		BeanUtils.copyProperties(playerVO, entity);
		IPLTeamVO teamVO = playerVO.getTeam();
		IPLTeam teamEntity = teamRepo.findById(teamVO.getTeamid())
				.orElseThrow(() -> new IllegalArgumentException("invalid Team id"));
		BeanUtils.copyProperties(teamVO, teamEntity);
		entity.setTeam(teamEntity);
		System.out.println("Entity obj::" + entity + "..." + entity.getTeam());
		int idVal = playerRepo.save(entity).getPid();
		return "Player is registered with the Id ::" + idVal;
	}

	@Override
	public IPLPlayerVO findPlayerById(int id) {
		log.info("findPlayerById(-) method");
		Optional<IPLPlayer> opt = playerRepo.findById(id);
		if (opt.isPresent()) {
			log.info("findPlayerById(-) --player found and returned");
			IPLPlayer playerEntity = opt.get();
			IPLTeam teamEntity = playerEntity.getTeam();
			log.debug("copy  Entity obj to VO class obj");
			IPLPlayerVO playerVO = new IPLPlayerVO();
			IPLTeamVO teamVO = new IPLTeamVO();
			BeanUtils.copyProperties(teamEntity, teamVO);
			BeanUtils.copyProperties(playerEntity, playerVO);
			playerVO.setTeam(teamVO);
			return playerVO;
		}
		log.error("Problem in finding the player");
		throw new PlayerNotFoundException("Player not found");

	}

	@Override
	public List<IPLPlayerVO> findAllPlayers() {
		log.info("findAllPlayer() method");
		List<IPLPlayer> listEntities = playerRepo.findAll();
		log.debug("copying List of Entities to List of VOs");
		List<IPLPlayerVO> listVO = new ArrayList();
		listEntities.forEach(entity -> {
			IPLTeam teamEntity = entity.getTeam();
			IPLPlayerVO playerVO = new IPLPlayerVO();
			IPLTeamVO teamVO = new IPLTeamVO();
			BeanUtils.copyProperties(teamEntity, teamVO);
			BeanUtils.copyProperties(entity, playerVO);
			playerVO.setTeam(teamVO);
			listVO.add(playerVO);
		});
		return listVO;
	}

}
