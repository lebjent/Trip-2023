package tnew.manager.project.locationManage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.code.entity.Location;


public interface LocationManageRepository extends JpaRepository<Location, String>, LocationManageCustomRepository  {
	
	//공항코드 중복체크
	Location findByAcode(String acode);
	
}
