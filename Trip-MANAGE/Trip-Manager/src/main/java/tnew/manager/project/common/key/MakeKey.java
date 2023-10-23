package tnew.manager.project.common.key;

public class MakeKey {
	
	/*
	 * 작 성 자 : 전 준 표
	 * 작 성 일 : 2023-10-23
	 * 작 성 내 용 : 사원번호를 생성할때 기본키를 만들어 주는 함수
	 */
	public static String makeEmployeeId(String key) {
	    String start = "WBTM";
	    int nextNumber = 1;

	    if (key != null) {
	        String strNumber = key.replace(start, "");
	        nextNumber = Integer.parseInt(strNumber) + 1;
	    }

	    String resultKey = start + String.format("%04d", nextNumber);
	    return resultKey;
	}
	
}
