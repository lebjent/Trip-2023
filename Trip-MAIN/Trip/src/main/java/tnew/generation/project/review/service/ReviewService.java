package tnew.generation.project.review.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import tnew.generation.project.review.dto.ReviewSearchDTO;
import tnew.generation.project.review.entity.Review;
import tnew.generation.project.review.entity.ReviewFile;
import tnew.generation.project.review.repository.ReviewRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
	
	private final ReviewRepository reviewRepository;
	private final ReviewFileService reviewFileService;
	
	public Long reviewWrite(Review review , List<MultipartFile> reviewFileList)throws Exception{
		//게시물 등록
		reviewRepository.save(review);
		if(reviewFileList != null && !reviewFileList.isEmpty()) {
			//파일등록
			for(int i=0; i<reviewFileList.size();i++) {
				ReviewFile reviewFile =  new ReviewFile();
				reviewFile.setReview(review);
				reviewFileService.saveReviewFile(reviewFile, reviewFileList.get(i));
			}
		}
		return review.getRno();
	}
	
	@Transactional(readOnly = true)
	public Page<Review> getReviewList(Pageable page, ReviewSearchDTO searchParam)throws Exception{
		return reviewRepository.getReviewListPage(page,searchParam);
	}
	
	
}

