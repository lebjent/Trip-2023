package tnew.manager.project.code.entity;

import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import tnew.manager.project.airLineManage.dto.AirPlaneManageFormDTO;

@Getter
@Setter
@ToString
@Entity
@Table(name = "airplane_tbl")
public class AirPlane {
	
	@Id
	@Column(name = "code")//컬럼명
	private String code; //항공편명 풀코드
	
	@Column(name = "flight_code" , nullable = true, length= 10)
	private String flightCode;
	
    @ManyToOne
    @JoinColumn(name = "airline_code", referencedColumnName = "code")
    private AirLines airlineCode; // 항공사코드 (외래키)
	
    @ManyToOne
    @JoinColumn(name = "departure", referencedColumnName = "acode")
    private Location departure; // 출발지 (외래키)

    @ManyToOne
    @JoinColumn(name = "arrive", referencedColumnName = "acode")
    private Location arrive; // 도착지 (외래키)
    
	@Column(name = "departure_time" , nullable = true)
	private String departureTime;//출발시간
    
	@Column(name = "arrive_time", nullable = true)
	private String arriveTime;//도착시간
	
	public static AirPlane settingAirPlane(AirPlaneManageFormDTO dto) {
		AirPlane airPlane = new AirPlane();
		
		AirLines airlineCode = new AirLines();
		airlineCode.setCode(dto.getAirlineCode());
		
		Location departure = new Location();
		departure.setAcode(dto.getDeparture());
		Location arrive = new Location();
		arrive.setAcode(dto.getArrive());
		
		airPlane.setCode(dto.getCode());
		airPlane.setFlightCode(dto.getFlightCode());
		airPlane.setAirlineCode(airlineCode);
		airPlane.setDeparture(departure);
		airPlane.setArrive(arrive);
		airPlane.setDepartureTime(dto.getDepartureTime());
		airPlane.setArriveTime(dto.getArriveTime());
		
		return airPlane;
	}
    
}
