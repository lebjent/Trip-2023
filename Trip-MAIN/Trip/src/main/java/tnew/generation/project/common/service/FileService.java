package tnew.generation.project.common.service;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class FileService {
	
	//파일 업로드 기능
	public Map<String,Object> uploadFile(String uploadPath,String mainFolder ,String originalFileName, byte[] fileData)throws Exception{
		
		Map<String,Object> fileInfo = new HashMap<>();
		
		//오늘날짜의 폴더를 생성하는 스트링 경로
		String uploadFolderPath = getFolder();

		//업로드 경로를 생성 해당 폴더가 없으면 폴더를 생성하게 하는 코드
		File uploadFinalPath = new File(uploadPath+mainFolder,uploadFolderPath);
		
		//해당 폴더가 있는지 체크 없으면 생성
		if(uploadFinalPath.exists() == false) {
			uploadFinalPath.mkdirs();
		}
		
		UUID uuid = UUID.randomUUID();//중복된 파일명 없이 서로 다른개체를 부여하기위해 적용
		
		//확장자 명
		String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
		//UUID받은값과 확장자명을 조합하기위해 확장자 명을 만든다.
		String savedFileName = uuid.toString()+ extension;
		
		String fileUploadFullUrl = uploadFinalPath + "/" + savedFileName;
		
		//생성자로 파일이 저장될 위치와 파일의 이름을 넘겨 파일에 쓸 파일 출력 스트림을 만든다.
		FileOutputStream fos = new FileOutputStream(fileUploadFullUrl);
		
		fos.write(fileData);
		fos.close();
		
		//파일 업로드 정보
		fileInfo.put("fileName", savedFileName);//파일 이름 + .확장자명
		fileInfo.put("fileSavePath", mainFolder + uploadFolderPath + savedFileName);
		
		return fileInfo;
	}
	
	//년-월-일 폴더의 생성을 위한 문자열을 만들어주는 메서드
	private String getFolder() {
		//현재 날짜를 yyyy-MM-dd로 생성
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		Date date = new Date();
		String str = sdf.format(date);
		return str.replace("-",File.separator);
	
	}
	
}
