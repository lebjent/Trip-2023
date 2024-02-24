package tnew.manager.project.airLineManage.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import tnew.manager.project.airLineManage.dto.AirLinesFormDTO;
import tnew.manager.project.common.entity.BaseEntity;

@Getter
@Setter
@ToString
@Entity
@Table(name = "airlines_tbl")
public class AirLines extends BaseEntity {
	
	@Id
	@Column(name = "code")//컬럼명
	private String code; //항공사코드
	
	@Column(name="airline_name",nullable = false, length=200)
	private String airlineName; //항공사명
	
    public static AirLines settingAirLines(AirLinesFormDTO dto) {
    	
    	AirLines airline = new AirLines();
    	
    	airline.setCode(dto.getCode());
    	airline.setAirlineName(dto.getAirlineName());
    	
    	return airline;
    }	
    
	
}
