package tnew.manager.project.common.entity;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@EntityListeners(value = {AuditingEntityListener.class})
@MappedSuperclass
@Getter
public class BaseEntity extends BaseTimeEntity {
	
	@Schema(description = "작성자")
	@CreatedBy
	@Column(updatable = false)
	private String createBy;
	
	@Schema(description = "수정자")
	@LastModifiedBy
	private String modifiedBy;
	
}
