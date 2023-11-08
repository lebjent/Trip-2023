package tnew.manager.project.locationManage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import tnew.manager.project.code.entity.Location;

public interface LocationManageCustomRepository {
	
	Page<Location> getLocaitonListPage(Pageable pageable);
	
}
