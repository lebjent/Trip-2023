package tnew.manager.project.code.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.code.entity.Country;


public interface CountryRepository extends JpaRepository<Country, String> {
	
    // 국가명을 기준으로 내림차순으로 정렬된 국가 목록을 가져오는 메서드
    List<Country> findAllByOrderByNameAsc();
}
