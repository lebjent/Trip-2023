package tnew.manager.project.login.repository;

public interface LoginCustomRepository {
	
	//로그인 허가 여부 체크
	public String loginPermissionConfirm(String employeeId) throws Exception;

}
