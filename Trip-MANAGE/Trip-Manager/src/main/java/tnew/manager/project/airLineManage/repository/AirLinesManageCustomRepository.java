package tnew.manager.project.airLineManage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import tnew.manager.project.airLineManage.dto.AirLinesSearchDTO;
import tnew.manager.project.airLineManage.entity.AirLines;

public interface AirLinesManageCustomRepository {
	
	Page<AirLines> getAirLinesManageList(Pageable pageable,AirLinesSearchDTO searchDTO);
	
}
