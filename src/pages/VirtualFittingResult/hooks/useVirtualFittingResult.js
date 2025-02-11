const uploadImageAndGetUrl = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:7860/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        return result.filepath; // ✅ 서버에서 반환된 filepath 사용
    } catch (error) {
        console.error("이미지 업로드 오류:", error);
        return null;
    }
};

const fetchVirtualFitting = useCallback(async () => {
    if (!userImage || !clothingImage || !category) {
        alert("잘못된 접근입니다.");
        navigate("/");
        return;
    }

    setIsLoading(true);

    try {
        // ✅ 이미지 업로드 후 서버에서 filepath 받아오기
        const userImageUrl = await uploadImageAndGetUrl(userImage);
        const clothingImageUrl = await uploadImageAndGetUrl(clothingImage);

        if (!userImageUrl || !clothingImageUrl) {
            alert("이미지 업로드에 실패했습니다.");
            return;
        }

        const requestData = {
            vton_img: userImageUrl,
            garm_img: clothingImageUrl,
            category,
            n_samples: 1,
            n_steps: 20,
            image_scale: 2,
            seed: -1,
        };

        const response = await fetch("http://localhost:7860/process_dc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const responseData = await response.json();
        if (responseData && responseData.image) {
            setGeneratedImage(responseData.image);
        } else {
            alert("이미지 생성에 실패했습니다.");
        }
    } catch (error) {
        console.error("가상 피팅 오류:", error);
        alert("가상 피팅 요청 중 오류가 발생했습니다.");
    } finally {
        setIsLoading(false);
    }
}, [userImage, clothingImage, category, navigate]);
