package tnew.manager.project.login.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.common.exception.LoginFailException;
import tnew.manager.project.common.security.EmployeeInfo;
import tnew.manager.project.employee.entity.Employee;
import tnew.manager.project.login.repository.LoginRepository;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {
	
	private final LoginRepository repository;
	
	
	@Override
	public UserDetails loadUserByUsername(String employeeId) throws LoginFailException {
		/*
		 * 1. 아이디가 없을 경우 = "NO_ID"
		 * 2. 컨펌이 'N'일 경우 = "NO_CONFIRM"
		 * 3. 회원가입이 실패 했을경우 = "NO_AHTHORIZE"
		 * 4. 회원가입이 성공 했을경우 = "OK_AUTHORIZE"
		 */
		
		String loginResultCode = null;
		
		Optional<Employee> employee = repository.findByEmployeeId(employeeId);
		
		if(!employee.isPresent()) {
			
			loginResultCode = "NO_ID";
			throw new LoginFailException(loginResultCode);
		}else {
			String confirmCheck = null;
			try {
				confirmCheck = repository.loginPermissionConfirm(employeeId);
			} catch (Exception e) {
				e.printStackTrace();
			}
			if(confirmCheck.equals("N")) {
				loginResultCode = "NO_CONFIRM";
				throw new LoginFailException(loginResultCode);
			}
			
		}
		
		EmployeeInfo employeeInfo = new EmployeeInfo();
		
		employeeInfo.setEmployeeId(employee.get().getEmployeeId());
		employeeInfo.setPassword(employee.get().getPassword());
		employeeInfo.setName(employee.get().getName());
		employeeInfo.setDivision(employee.get().getDivision());
		employeeInfo.setAuthorities(employee.get().getRole());
		
		return employeeInfo;
	}
	
}
