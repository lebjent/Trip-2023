package tnew.generation.project.review.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import tnew.generation.project.common.service.FileService;
import tnew.generation.project.review.entity.ReviewFile;
import tnew.generation.project.review.repository.ReviewFileRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewFileService {
	
	@Value("${reviewFileLocation}")
	private String reviewFileLocation;
	
	private final FileService fileService;
	
	private final ReviewFileRepository reviewFileRepository;
	
	//여행리뷰 첨부파일 저장
	public void saveReviewFile(ReviewFile reviewFile, MultipartFile attachFile) throws Exception {
		
		String originalFileName = attachFile.getOriginalFilename();
		String fileName = "";
		String fileUrl = "";
		
		//파일 업로드
		if(!StringUtils.isEmpty(originalFileName)) {
			Map<String,Object> fileInfo = fileService.uploadFile(reviewFileLocation,"review/",originalFileName, attachFile.getBytes());
			fileName = fileInfo.get("fileName").toString();
			fileUrl = "/file/"+ fileInfo.get("fileSavePath").toString();
		}
		
		//상품 이미지 정보 저장
		reviewFile.updateFile(originalFileName, fileName, fileUrl);
		reviewFileRepository.save(reviewFile);
	}
	
}
