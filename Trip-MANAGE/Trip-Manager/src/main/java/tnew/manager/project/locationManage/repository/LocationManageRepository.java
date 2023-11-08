package tnew.manager.project.locationManage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.code.entity.Location;


public interface LocationManageRepository extends JpaRepository<Location, String>, LocationManageCustomRepository  {

}
