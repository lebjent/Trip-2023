package tnew.manager.project.airPlaneManage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.airPlaneManage.entity.AirPlane;

public interface AirPlaneManageRepository extends JpaRepository<AirPlane, String> , AirPlaneManageCustomRepository {

}
