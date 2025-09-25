import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const TryOnPage = ({ user = { bodyType: 'athletic', height: 175 }, onAddToCart = () => {} }) => {
  // Get product ID from URL params
  const { category, itemId } = useParams();
  const [currentProductId, setCurrentProductId] = useState(itemId || 'c1');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [poseData, setPoseData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPose, setShowPose] = useState(true);
  const [showSegmentation, setShowSegmentation] = useState(false);
  const [cameraLength, setCameraLength] = useState(1.0);
  const [fps, setFps] = useState(0);
  const [webcamError, setWebcamError] = useState(null);
  
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Sample product data
  const products = {
    clothes: [
      {
        id: 'c1',
        name: 'Classic Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/4A90E2/FFFFFF?text=Classic+Denim+Jacket',
        localImage: '/img/img1.png',
        category: 'clothes',
        type: 'jacket',
        trending: true,
        colors: ['#4A90E2', '#2C3E50', '#E74C3C'],
        sizes: ['S', 'M', 'L', 'XL']
      },
      {
        id: 'c2',
        name: 'Casual Cotton T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/29B6F6/FFFFFF?text=Cotton+T-Shirt',
        localImage: '/img/img2.png',
        category: 'clothes',
        type: 'tshirt',
        trending: false,
        colors: ['#FFFFFF', '#000000', '#E74C3C'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'c3',
        name: 'Summer Floral Dress',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/FF6B6B/FFFFFF?text=Floral+Dress',
        localImage: '/img/img3.png',
        category: 'clothes',
        type: 'dress',
        trending: true,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
        sizes: ['XS', 'S', 'M', 'L']
      },
      {
        id: 'c4',
        name: 'Business Blazer',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/2C3E50/FFFFFF?text=Business+Blazer',
        localImage: '/img/img4.png',
        category: 'clothes',
        type: 'blazer',
        trending: false,
        colors: ['#2C3E50', '#34495E', '#7F8C8D'],
        sizes: ['S', 'M', 'L', 'XL']
      }
    ],
    sunglasses: [
      {
        id: 's1',
        name: 'Aviator Classic',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/FFD700/000000?text=Aviator+Classic',
        localImage: '/img/img1.png',
        category: 'sunglasses',
        type: 'aviator',
        trending: true,
        colors: ['#FFD700', '#C0C0C0', '#000000'],
        faceTypes: ['oval', 'square', 'heart']
      },
      {
        id: 's2',
        name: 'Retro Round',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/8B4513/FFFFFF?text=Retro+Round',
        localImage: '/img/img2.png',
        category: 'sunglasses',
        type: 'round',
        trending: false,
        colors: ['#8B4513', '#000000', '#FF1493'],
        faceTypes: ['square', 'diamond', 'heart']
      },
      {
        id: 's3',
        name: 'Modern Wayfarer',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/000000/FFFFFF?text=Modern+Wayfarer',
        localImage: '/img/img3.png',
        category: 'sunglasses',
        type: 'wayfarer',
        trending: true,
        colors: ['#000000', '#8B4513', '#4A4A4A'],
        faceTypes: ['round', 'oval', 'square']
      },
      {
        id: 's4',
        name: 'Cat Eye Glamour',
        price: 139.99,
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fallbackImage: 'https://via.placeholder.com/500x400/FF1493/FFFFFF?text=Cat+Eye+Glamour',
        localImage: '/img/img4.png',
        category: 'sunglasses',
        type: 'cateye',
        trending: false,
        colors: ['#FF1493', '#000000', '#8B4513'],
        faceTypes: ['round', 'heart', 'oval']
      }
    ]
  };

  const allProducts = [...products.clothes, ...products.sunglasses];
  const product = allProducts.find(p => p.id === currentProductId) || allProducts[0];

  // Generate mock keypoints for pose detection
  const generateMockKeypoints = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    
    const keypoints = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Generate more realistic keypoints
    const basePositions = [
      // Face keypoints (0-10)
      [centerX, centerY - 120], // nose
      [centerX - 15, centerY - 130], // left eye inner
      [centerX - 25, centerY - 130], // left eye
      [centerX - 35, centerY - 130], // left eye outer
      [centerX + 15, centerY - 130], // right eye inner
      [centerX + 25, centerY - 130], // right eye
      [centerX + 35, centerY - 130], // right eye outer
      [centerX - 40, centerY - 125], // left ear
      [centerX + 40, centerY - 125], // right ear
      [centerX - 20, centerY - 110], // mouth left
      [centerX + 20, centerY - 110], // mouth right
      
      // Body keypoints (11-32)
      [centerX - 60, centerY - 50], // left shoulder
      [centerX + 60, centerY - 50], // right shoulder
      [centerX - 90, centerY + 20], // left elbow
      [centerX + 90, centerY + 20], // right elbow
      [centerX - 100, centerY + 80], // left wrist
      [centerX + 100, centerY + 80], // right wrist
      [centerX - 20, centerY - 50], // left pinky
      [centerX + 20, centerY - 50], // right pinky
      [centerX - 15, centerY - 45], // left index
      [centerX + 15, centerY - 45], // right index
      [centerX - 10, centerY - 40], // left thumb
      [centerX + 10, centerY - 40], // right thumb
      [centerX - 30, centerY + 100], // left hip
      [centerX + 30, centerY + 100], // right hip
      [centerX - 35, centerY + 180], // left knee
      [centerX + 35, centerY + 180], // right knee
      [centerX - 40, centerY + 240], // left ankle
      [centerX + 40, centerY + 240], // right ankle
      [centerX - 45, centerY + 250], // left heel
      [centerX + 45, centerY + 250], // right heel
      [centerX - 35, centerY + 250], // left foot index
      [centerX + 35, centerY + 250]  // right foot index
    ];
    
    basePositions.forEach((pos, i) => {
      keypoints.push({
        x: pos[0] + (Math.random() - 0.5) * 20,
        y: pos[1] + (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 0.1,
        visibility: 0.8 + Math.random() * 0.2
      });
    });
    
    return keypoints;
  }, []);

  // Draw pose skeleton
  const drawPoseSkeleton = useCallback((ctx, keypoints) => {
    if (!keypoints || keypoints.length === 0) return;
    
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#FF0000';
    
    // Draw keypoints
    keypoints.forEach((point) => {
      if (point && point.visibility > 0.5) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    
    // Draw connections
    const connections = [
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
      [11, 23], [12, 24], [23, 24],
      [23, 25], [24, 26], [25, 27], [26, 28],
      [27, 29], [28, 30], [29, 31], [30, 32]
    ];
    
    connections.forEach(([start, end]) => {
      if (keypoints[start] && keypoints[end] && 
          keypoints[start].visibility > 0.5 && keypoints[end].visibility > 0.5) {
        ctx.beginPath();
        ctx.moveTo(keypoints[start].x, keypoints[start].y);
        ctx.lineTo(keypoints[end].x, keypoints[end].y);
        ctx.stroke();
      }
    });
  }, []);

  // Draw clothing overlay based on product type
  const drawClothingOverlay = useCallback((ctx, keypoints) => {
    if (!keypoints || keypoints.length === 0) return;
    
    if (product.category === 'clothes') {
      drawClothesOverlay(ctx, keypoints);
    } else if (product.category === 'sunglasses') {
      drawGlassesOverlay(ctx, keypoints);
    }
  }, [product, selectedColor, cameraLength]);

  // Draw clothes overlay - Enhanced with more realistic shapes
  const drawClothesOverlay = useCallback((ctx, keypoints) => {
    const leftShoulder = keypoints[11];
    const rightShoulder = keypoints[12];
    const leftHip = keypoints[23];
    const rightHip = keypoints[24];
    
    if (leftShoulder && rightShoulder && 
        leftShoulder.visibility > 0.5 && rightShoulder.visibility > 0.5) {
      
      const centerX = (leftShoulder.x + rightShoulder.x) / 2;
      const centerY = (leftShoulder.y + rightShoulder.y) / 2;
      const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
      const width = shoulderWidth * 2.5 * cameraLength;
      const height = width * 1.3;
      
      // Draw clothing with more realistic shape based on product type
      ctx.fillStyle = product.colors[selectedColor] || '#4A90E2';
      ctx.globalAlpha = 0.8;
      
      if (product.type === 'jacket' || product.type === 'blazer') {
        // Draw jacket shape
        ctx.fillRect(
          centerX - width / 2, 
          centerY - height / 6, 
          width, 
          height
        );
        
        // Add collar
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(centerX - width/4, centerY - height/6, width/2, height/8);
        
        // Add buttons
        ctx.fillStyle = '#000000';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(centerX, centerY + i * height/6, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
        
      } else if (product.type === 'tshirt') {
        // Draw t-shirt shape
        ctx.fillRect(
          centerX - width / 2, 
          centerY - height / 8, 
          width, 
          height * 0.8
        );
        
        // Add sleeves
        ctx.fillStyle = product.colors[selectedColor] || '#4A90E2';
        ctx.fillRect(centerX - width/2 - 20, centerY - height/8, 20, height/3);
        ctx.fillRect(centerX + width/2, centerY - height/8, 20, height/3);
        
      } else if (product.type === 'dress') {
        // Draw dress shape
        ctx.fillRect(
          centerX - width / 2, 
          centerY - height / 6, 
          width, 
          height * 1.5
        );
        
        // Add waist line
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - width/3, centerY + height/3);
        ctx.lineTo(centerX + width/3, centerY + height/3);
        ctx.stroke();
      }
      
      // Draw product label
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      
      const textY = centerY + height/2 + 30;
      ctx.strokeText(product.name, centerX, textY);
      ctx.fillText(product.name, centerX, textY);
      
      // Add color indicator
      ctx.fillStyle = product.colors[selectedColor] || '#4A90E2';
      ctx.fillRect(centerX - 50, textY + 15, 100, 10);
      ctx.strokeRect(centerX - 50, textY + 15, 100, 10);
      
      // Add size indicator if available
      if (selectedSize) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Arial';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeText(`Size: ${selectedSize}`, centerX, textY + 40);
        ctx.fillText(`Size: ${selectedSize}`, centerX, textY + 40);
      }
    }
  }, [product, selectedColor, selectedSize, cameraLength]);

  // Draw glasses overlay - Enhanced with different styles
  const drawGlassesOverlay = useCallback((ctx, keypoints) => {
    const leftEye = keypoints[2];
    const rightEye = keypoints[5];
    const nose = keypoints[0];
    
    if (leftEye && rightEye && 
        leftEye.visibility > 0.5 && rightEye.visibility > 0.5) {
      
      const centerX = (leftEye.x + rightEye.x) / 2;
      const centerY = (leftEye.y + rightEye.y) / 2;
      const eyeDistance = Math.abs(rightEye.x - leftEye.x);
      const width = eyeDistance * 2.5 * cameraLength;
      const height = width * 0.5;
      
      ctx.strokeStyle = product.colors[selectedColor] || '#000000';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.9;
      
      if (product.type === 'aviator') {
        // Draw aviator style glasses
        // Left lens
        ctx.beginPath();
        ctx.ellipse(centerX - width/4, centerY, width/4, height/2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Right lens  
        ctx.beginPath();
        ctx.ellipse(centerX + width/4, centerY, width/4, height/2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Bridge
        ctx.beginPath();
        ctx.moveTo(centerX - width/8, centerY);
        ctx.lineTo(centerX + width/8, centerY);
        ctx.stroke();
        
        // Arms
        ctx.beginPath();
        ctx.moveTo(centerX - width/2, centerY);
        ctx.lineTo(centerX - width/2 - 30, centerY + 10);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + width/2, centerY);
        ctx.lineTo(centerX + width/2 + 30, centerY + 10);
        ctx.stroke();
        
      } else if (product.type === 'round') {
        // Draw round style glasses
        ctx.beginPath();
        ctx.arc(centerX - width/4, centerY, width/4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(centerX + width/4, centerY, width/4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Bridge
        ctx.beginPath();
        ctx.moveTo(centerX - width/8, centerY);
        ctx.lineTo(centerX + width/8, centerY);
        ctx.stroke();
        
      } else if (product.type === 'wayfarer') {
        // Draw wayfarer style glasses
        // Left lens (rectangular with rounded corners)
        ctx.fillRect(centerX - width/2, centerY - height/2, width/2, height);
        ctx.strokeRect(centerX - width/2, centerY - height/2, width/2, height);
        
        // Right lens
        ctx.fillRect(centerX, centerY - height/2, width/2, height);
        ctx.strokeRect(centerX, centerY - height/2, width/2, height);
        
        // Bridge
        ctx.beginPath();
        ctx.moveTo(centerX - width/8, centerY);
        ctx.lineTo(centerX + width/8, centerY);
        ctx.stroke();
        
      } else if (product.type === 'cateye') {
        // Draw cat eye style glasses
        // Left lens (upswept)
        ctx.beginPath();
        ctx.ellipse(centerX - width/4, centerY, width/4, height/2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Right lens
        ctx.beginPath();
        ctx.ellipse(centerX + width/4, centerY, width/4, height/2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Bridge
        ctx.beginPath();
        ctx.moveTo(centerX - width/8, centerY);
        ctx.lineTo(centerX + width/8, centerY);
        ctx.stroke();
        
        // Cat eye points
        ctx.beginPath();
        ctx.moveTo(centerX - width/2, centerY - height/4);
        ctx.lineTo(centerX - width/2 - 10, centerY - height/2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + width/2, centerY - height/4);
        ctx.lineTo(centerX + width/2 + 10, centerY - height/2);
        ctx.stroke();
      }
      
      // Frame highlight
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.7;
      
      // Add reflection effect
      ctx.beginPath();
      ctx.ellipse(centerX - width/4, centerY - 5, width/8, height/4, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.ellipse(centerX + width/4, centerY - 5, width/8, height/4, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw product label
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      
      const textY = centerY + height + 30;
      ctx.strokeText(product.name, centerX, textY);
      ctx.fillText(product.name, centerX, textY);
      
      // Add color indicator
      ctx.fillStyle = product.colors[selectedColor] || '#000000';
      ctx.fillRect(centerX - 40, textY + 10, 80, 8);
      ctx.strokeRect(centerX - 40, textY + 10, 80, 8);
      
      ctx.globalAlpha = 1.0;
    }
  }, [product, selectedColor, cameraLength]);

  // Main pose detection and drawing loop - Simplified like Streamlit
  const detectPose = useCallback((currentTime) => {
    if (!isWebcamActive || !webcamRef.current || !canvasRef.current) {
      if (isWebcamActive) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
      }
      return;
    }

    const canvas = canvasRef.current;
    
    // Simple frame rate limiting
    if (currentTime - lastTimeRef.current < 50) { // ~20 FPS like Streamlit
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    const timeDelta = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;
    setFps(Math.round(1000 / timeDelta));

    setIsProcessing(true);

    // Generate mock pose data
    const mockPoseData = {
      keypoints: generateMockKeypoints(),
      confidence: 0.85 + Math.random() * 0.15,
      timestamp: currentTime
    };

    setPoseData(mockPoseData);

    const ctx = canvas.getContext('2d');
    
    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Only draw overlays on transparent canvas (video shows through)
    if (mockPoseData.keypoints && mockPoseData.keypoints.length > 0) {
      // Draw pose skeleton if enabled
      if (showPose) {
        drawPoseSkeleton(ctx, mockPoseData.keypoints);
      }
      
      // Draw clothing/glasses overlay
      drawClothingOverlay(ctx, mockPoseData.keypoints);
    }

    setIsProcessing(false);
    animationFrameRef.current = requestAnimationFrame(detectPose);
  }, [isWebcamActive, showPose, generateMockKeypoints, drawPoseSkeleton, drawClothingOverlay]);

  // Start webcam - Simplified like Streamlit
  const startWebcam = useCallback(async () => {
    if (isWebcamActive) return;
    
    setWebcamError(null);
    
    try {
      console.log('Starting webcam...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      streamRef.current = stream;
      setIsWebcamActive(true);
      
      // Simple setup - wait for elements to be available
      setTimeout(() => {
        const video = webcamRef.current;
        const canvas = canvasRef.current;
        
        if (video && canvas) {
          video.srcObject = stream;
          video.width = 640;
          video.height = 480;
          canvas.width = 640;
          canvas.height = 480;
          
          // Start pose detection immediately to clear loading screen
          setTimeout(() => {
            // Generate initial pose data to hide loading screen
            setPoseData({
              keypoints: generateMockKeypoints(),
              confidence: 0.85,
              timestamp: performance.now()
            });
            
            // Start drawing loop
            lastTimeRef.current = performance.now();
            animationFrameRef.current = requestAnimationFrame(detectPose);
          }, 500); // Short delay to let video start
          
          console.log('Webcam setup complete');
        }
      }, 100);
      
    } catch (error) {
      console.error('Error starting webcam:', error);
      setWebcamError(error.message || 'Failed to access webcam');
      setIsWebcamActive(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [isWebcamActive, detectPose]);

  // Stop webcam
  const stopWebcam = useCallback(() => {
    console.log('Stopping webcam...');
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (webcamRef.current) {
      webcamRef.current.srcObject = null;
    }
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    
    setIsWebcamActive(false);
    setPoseData(null);
    setIsProcessing(false);
    setFps(0);
    setWebcamError(null);
    
    console.log('Webcam stopped successfully');
  }, []);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  // Update product when URL params change
  useEffect(() => {
    if (itemId && itemId !== currentProductId) {
      setCurrentProductId(itemId);
      setSelectedColor(0);
      setSelectedSize('');
    }
  }, [itemId, currentProductId]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target.result);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  // Enhanced image loading with multiple fallbacks
  const [imageError, setImageError] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(product.image);

  useEffect(() => {
    setImageError(false);
    setCurrentImageSrc(product.image);
  }, [product]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setCurrentImageSrc(product.fallbackImage);
    } else {
      setCurrentImageSrc(product.localImage || product.fallbackImage);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor: product.colors[selectedColor],
      selectedSize: selectedSize || (product.sizes && product.sizes[0])
    };
    onAddToCart(productToAdd);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image and Try-On Section */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={currentImageSrc}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                  onError={handleImageError}
                />
                {product.trending && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Trending
                  </div>
                )}
              </div>
            </div>

            {/* Product Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Try Different Products</h3>
              
              {/* Clothes */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">👕</span>
                  Clothing
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {products.clothes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentProductId(item.id);
                        setSelectedColor(0);
                        setSelectedSize('');
                      }}
                      className={`p-4 rounded-xl border-2 text-sm transition-all transform hover:scale-105 ${
                        currentProductId === item.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:shadow-md'
                      }`}
                    >
                      <div className="font-semibold truncate mb-1">{item.name}</div>
                      <div className="text-xs opacity-75">${item.price}</div>
                      <div className="flex justify-center mt-2">
                        <div className="flex space-x-1">
                          {item.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sunglasses */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">🕶️</span>
                  Sunglasses
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {products.sunglasses.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentProductId(item.id);
                        setSelectedColor(0);
                      }}
                      className={`p-4 rounded-xl border-2 text-sm transition-all transform hover:scale-105 ${
                        currentProductId === item.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:shadow-md'
                      }`}
                    >
                      <div className="font-semibold truncate mb-1">{item.name}</div>
                      <div className="text-xs opacity-75">${item.price}</div>
                      <div className="flex justify-center mt-2">
                        <div className="flex space-x-1">
                          {item.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Try-On Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Virtual Try-On
              </h3>
              
              {/* Try-On Options */}
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">How to Use Virtual Try-On</h4>
                      <p className="text-sm text-blue-700">
                        <strong>No photo upload required!</strong> Simply click "Start Webcam" to see how {product.name} looks on you in real-time. 
                        The AI will automatically detect your pose and overlay the product.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={isWebcamActive ? stopWebcam : startWebcam}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isWebcamActive
                        ? 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100'
                        : 'border-gray-300 hover:border-purple-400 text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{isWebcamActive ? '🛑' : '📹'}</div>
                    <div className="font-semibold">
                      {isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}
                    </div>
                    <div className="text-sm">
                      {isWebcamActive ? 'Click to stop' : 'Real-time try-on'}
                    </div>
                  </button>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      uploadedImage
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-purple-400 text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">📷</div>
                    <div className="font-semibold">Upload Photo</div>
                    <div className="text-sm">Static image try-on</div>
                  </button>
                </div>
                
                {webcamError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p className="font-semibold">Webcam Error:</p>
                    <p className="text-sm">{webcamError}</p>
                  </div>
                )}
              </div>

              {/* Live Webcam Preview - Always rendered when active */}
              {isWebcamActive && (
                <div className="mb-6">
                  <div className="relative bg-black rounded-xl overflow-hidden mb-4">
                    {/* Main video element - fully visible */}
                    <video
                      ref={webcamRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-96 object-cover"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                    
                    {/* Canvas overlay for AR effects - transparent overlay */}
                    <canvas
                      ref={canvasRef}
                      width={640}
                      height={480}
                      className="absolute inset-0 w-full h-96 object-cover pointer-events-none"
                    />
                    
                    {/* Status Overlays */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {isProcessing && (
                        <div className="bg-black/70 text-white px-3 py-2 rounded-lg flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          <span className="text-sm">AI Processing...</span>
                        </div>
                      )}
                      
                      {poseData && (
                        <div className="bg-green-600/80 text-white px-3 py-2 rounded-lg">
                          <span className="text-sm">✅ Body Tracking Active</span>
                        </div>
                      )}
                      
                      <div className="bg-blue-600/80 text-white px-3 py-2 rounded-lg">
                        <span className="text-sm">👕 {product.name}</span>
                      </div>
                    </div>

                    {/* FPS Counter */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg">
                      <span className="text-sm">FPS: {fps}</span>
                    </div>
                    
                    {/* STOP BUTTON - Large and visible */}
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={stopWebcam}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 shadow-lg font-semibold"
                      >
                        <span>🛑</span>
                        <span>STOP</span>
                      </button>
                    </div>
                    
                    {/* Loading state - only show when webcam is starting */}
                    {isWebcamActive && !poseData && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <div className="text-center text-white">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                          <div className="text-lg font-semibold mb-2">Initializing AI...</div>
                          <div className="text-sm opacity-75">Setting up pose detection</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Control Panel */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Virtual Try-On Controls</h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="showPose"
                          checked={showPose}
                          onChange={(e) => setShowPose(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="showPose" className="text-sm text-gray-700">
                          Show Pose Skeleton
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="showSegmentation"
                          checked={showSegmentation}
                          onChange={(e) => setShowSegmentation(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="showSegmentation" className="text-sm text-gray-700">
                          Body Segmentation
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">
                        Product Scale: {cameraLength.toFixed(1)}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={cameraLength}
                        onChange={(e) => setCameraLength(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {poseData && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-semibold text-gray-900 mb-2">Performance Stats</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>FPS: <span className="font-semibold">{fps}</span></div>
                          <div>Landmarks: <span className="font-semibold">{poseData.keypoints?.length || 0}</span></div>
                          <div>Confidence: <span className="font-semibold">{poseData.confidence ? Math.round(poseData.confidence * 100) : 0}%</span></div>
                          <div>Status: <span className="font-semibold text-green-600">Active</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Upload Section - Only when webcam is not active */}
              {!isWebcamActive && (
                <div className="mb-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage}
                          alt="Uploaded photo"
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-green-600 font-semibold">✅ Photo uploaded successfully!</p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-purple-600 hover:text-purple-700 text-sm"
                        >
                          Upload different photo
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-4xl">📷</div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Upload Your Photo
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Get a personalized AI try-on experience
                          </p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            {isUploading ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Uploading...
                              </div>
                            ) : (
                              'Choose Photo'
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details and Options */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-purple-600 mb-6">${product.price}</p>
              
              <div className="text-gray-600 mb-6">
                <p className="capitalize text-lg">{product.type}</p>
                <p className="text-sm">Perfect for your {user.bodyType} body type</p>
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === index
                        ? 'border-purple-500 scale-110'
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                        selectedSize === size
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-purple-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  💡 AI recommends size based on your {user.height}cm height
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                🛒 Add to Cart - ${product.price}
              </button>
              
              <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all">
                💝 Add to Wishlist
              </button>
            </div>

            {/* Product Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">✨</span>
                  AI-powered virtual try-on
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📏</span>
                  Perfect fit guarantee
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🚚</span>
                  Free shipping worldwide
                </li>
                <li className="flex items-center">
                  <span className="mr-2">↩️</span>
                  30-day return policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;
