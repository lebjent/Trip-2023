package tnew.manager.project.join.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tnew.manager.project.employee.entity.Employee;


public interface JoinRepository extends JpaRepository<Employee, String> {
	
	//가장 최근에 가입된 아이디를 가져오기
	Employee findFirstByOrderByEmployeeIdDesc();
	
}
