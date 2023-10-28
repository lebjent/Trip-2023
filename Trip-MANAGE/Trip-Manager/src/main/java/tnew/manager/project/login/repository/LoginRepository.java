package tnew.manager.project.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import tnew.manager.project.employee.entity.Employee;

public interface LoginRepository extends JpaRepository<Employee,String>,QuerydslPredicateExecutor<Employee>,LoginCustomRepository {
	
	//Optional은 Java 8에서 도입된 클래스로, 값이 존재할 수도 있고 존재하지 않을 수도 있는 상황을 처리하는 데 유용
	//입력한 아이디로 로그인 처리를 하려고 구현
	Optional<Employee> findByEmployeeId(String employeeId);
	
}
