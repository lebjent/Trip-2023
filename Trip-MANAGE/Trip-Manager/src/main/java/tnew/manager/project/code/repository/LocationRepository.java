package tnew.manager.project.code.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.code.entity.Location;

public interface LocationRepository extends JpaRepository<Location, String> {
	
	List<Location> findAllByOrderByNameAsc();
	
}
