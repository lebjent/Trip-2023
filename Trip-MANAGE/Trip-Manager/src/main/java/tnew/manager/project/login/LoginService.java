package tnew.manager.project.login;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.employee.dto.EmployeeFormDTO;
import tnew.manager.project.employee.entity.Employee;
import tnew.manager.project.login.repository.LoginRepository;

@Service
@RequiredArgsConstructor
public class LoginService {
	
	private final LoginRepository repository;
	
	public String login(EmployeeFormDTO employeeInfo)throws Exception{
		
		String loginResultCode = null;
		
		//Optional<Employee> employee = repository.findByEmployeeId(employeeInfo.getEmployeeId());
		
		return loginResultCode;
		
	}
	
}
