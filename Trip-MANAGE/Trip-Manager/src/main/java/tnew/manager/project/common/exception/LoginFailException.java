package tnew.manager.project.common.exception;

import org.springframework.security.core.AuthenticationException;

public class LoginFailException extends AuthenticationException{

	private static final long serialVersionUID = 1L;

	public LoginFailException(String msg) {
		super(msg);
	}

}
