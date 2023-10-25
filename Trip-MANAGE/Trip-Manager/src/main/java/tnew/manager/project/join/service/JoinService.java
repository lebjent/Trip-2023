package tnew.manager.project.join.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.common.key.MakeKey;
import tnew.manager.project.employee.entity.Employee;
import tnew.manager.project.join.repository.JoinRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class JoinService {
	
	private final JoinRepository repository;
	
	public String getEmployeeId()throws Exception{
		 
		String currentId = null;
		Employee employee = repository.findFirstByOrderByEmployeeIdDesc();
		
	    if (employee != null) {
	    	currentId = employee.getEmployeeId(); 
	    }
	    
	    String employeeId = MakeKey.makeEmployeeId(currentId);
	    
	    return employeeId;
	}
	
	public void employeeJoin(Employee employee,PasswordEncoder passwordEncoder) throws Exception{
		
		
		repository.save(employee);
		
	
	}
}
