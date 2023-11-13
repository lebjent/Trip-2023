package tnew.manager.project.code.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.code.entity.AirLines;

public interface AirLinesRepository extends JpaRepository<AirLines, String> {
	
	//항공사 코드 중복체크
	boolean existsByCode(String code);
	
}
