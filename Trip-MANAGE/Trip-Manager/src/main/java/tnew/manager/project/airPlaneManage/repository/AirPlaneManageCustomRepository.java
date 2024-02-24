package tnew.manager.project.airPlaneManage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import tnew.manager.project.airPlaneManage.dto.AirPlaneListSearchDTO;
import tnew.manager.project.airPlaneManage.entity.AirPlane;

public interface AirPlaneManageCustomRepository {
	
	
	Page<AirPlane> getAirPlaneManageList(Pageable pageable,AirPlaneListSearchDTO searchDTO);
	
}
