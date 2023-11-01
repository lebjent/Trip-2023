package tnew.manager.project.code.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import tnew.manager.project.common.entity.BaseEntity;
import tnew.manager.project.locationManage.dto.LocationFormDTO;

@Getter
@Setter
@ToString
@Entity
@Table(name = "location_tbl")//테이블명
public class Location extends BaseEntity {
	
	@Id
	@Column(name = "acode")//컬럼명
	private String acode; //공항코드
	
	@Column(nullable = false, length=200)
	private String name; //도시명
	
    @ManyToOne
    @JoinColumn(name = "ccode", referencedColumnName = "code")
    private Country ccode; // 국가 코드 (외래 키)
	
    public static Location settingLocation(LocationFormDTO dto,Country contry) {
    	Location location = new Location();
    	
    	location.setAcode(dto.getAcode());
    	location.setName(dto.getName());
    	location.setCcode(contry);
    	
    	return location;
    }	
    
}
