package tnew.manager.project.airLineManage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import tnew.manager.project.code.entity.AirPlane;
import tnew.manager.project.code.entity.Location;

public interface AirPlaneManageCustomRepository {
	
	
	Page<AirPlane> getAirPlaneManageList(Pageable pageable);
	
}
