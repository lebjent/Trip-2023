package tnew.manager.project.code.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.code.entity.AirLines;

public interface AirLinesRepository extends JpaRepository<AirLines, String> {
	
	//항공사 코드 중복체크
	boolean existsByCode(String code);
	
	//항공사
	List<AirLines> findAllByOrderByAirlineNameAsc();
	
}
