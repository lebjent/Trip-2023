package tnew.manager.project.airLineManage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.code.entity.AirPlane;

public interface AirPlaneManageRepository extends JpaRepository<AirPlane, String> , AirPlaneManageCustomRepository {

}
