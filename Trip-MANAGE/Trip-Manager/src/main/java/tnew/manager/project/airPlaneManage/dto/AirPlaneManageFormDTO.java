package tnew.manager.project.airPlaneManage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AirPlaneManageFormDTO {
	
	@Schema(name = "항공편명 풀코드")
	private String code;
	
	@Schema(name = "항공편명")
	private String flightCode;
	
	@Schema(name = "항공사 코드")
	private String airlineCode;
	
	@Schema(name = "출발지")
	private String departure;
	
	@Schema(name = "도착지")
	private String arrive;
	
	@Schema(name = "출발시간")
	private String departureTime; 
	
	@Schema(name = "도착시간")
	private String arriveTime;
	
	
}
