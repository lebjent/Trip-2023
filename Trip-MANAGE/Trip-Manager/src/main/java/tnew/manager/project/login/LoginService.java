package tnew.manager.project.login;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.common.exception.LoginFailException;
import tnew.manager.project.employee.dto.EmployeeFormDTO;
import tnew.manager.project.employee.entity.Employee;
import tnew.manager.project.login.repository.LoginRepository;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {
	
	private final LoginRepository repository;
	
	public String login(EmployeeFormDTO employeeInfo)throws Exception{
		
		/*
		 * 1. 아이디가 없을 경우 = "NO_ID"
		 * 2. 컨펌이 'N'일 경우 = "NO_CONFIRM"
		 * 3. 회원가입이 실패 했을경우 = "NO_AHTHORIZE"
		 * 4. 회원가입이 성공 했을경우 = "OK_AUTHORIZE"
		 */
		
		String loginResultCode = null;
		
		Optional<Employee> employee = repository.findByEmployeeId(employeeInfo.getEmployeeId());
		
		if(!employee.isPresent()) {
			
			loginResultCode = "NO_ID";
			
		}else {
			String confirmCheck = repository.loginPermissionConfirm(employee.get().getEmployeeId()); 
			if(confirmCheck.equals("N")) {
				loginResultCode = "NO_CONFIRM";
			}else {
				
			}
		}
			
		
		return loginResultCode;
		
	}

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
			try {
				String confirmCheck = repository.loginPermissionConfirm(employeeId);
				if(confirmCheck.equals("N")) {
					loginResultCode = "NO_CONFIRM";
					throw new LoginFailException(loginResultCode);
				}
				throw new LoginFailException(loginResultCode);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
        UserDetails userDetails = User
                .withUsername(employee.get().getEmployeeId())
                .password(employee.get().getPassword())
                .roles(employee.get().getDivision())
                .build();
		
		return userDetails;
	}
	
}
