# ClearScan

## Background

In Indonesia, approximately 3.7 million people experience visual impairments, with the majority suffering from low vision. Although these impairments are often not severe enough to require Braille, they significantly hinder the ability to read text on product packaging, documents, or informational signage.

Current solutions remain limited and do not fully support the Indonesian language. Applications such as Google Lookout and Seeing AI offer OCR-based text-to-speech features; however, they are suboptimal in reading Indonesian text and frequently require a stable internet connection.

With the increased accessibility of AI technology and cloud computing, there is a significant opportunity to develop ClearScan—a web and mobile application that enables users with partial vision impairment to scan text and listen to its spoken output in real time. The application is designed to be user-friendly, accurately support the Indonesian language, and function both online and offline. Ultimately, ClearScan aims to empower individuals with partial vision impairments to independently access everyday information, such as road signs, text on medication packaging, and other critical documents.

## Problem Statement

1. How can we assist individuals with partial vision impairments in reading text more easily and independently?
2. How can we enhance the accuracy of scanning and reading Indonesian text using OCR and text-to-speech (TTS) technologies?
3. How can we develop a lightweight, user-friendly web and mobile solution that functions effectively both online and offline?
4. How can we ensure that this solution is more effective and affordable compared to existing applications in the industry?

## References

- World Health Organization (WHO). (2023). *Blindness and Vision Impairment*. Retrieved from [https://www.who.int](https://www.who.int)
- Kementerian Kesehatan Republik Indonesia. (2022). *Prevalence of Visual Impairments in Indonesia*. Retrieved from [https://www.kemkes.go.id](https://www.kemkes.go.id)
- Google Lookout. (n.d.). *AI-powered Assistance for the Visually Impaired*. Retrieved from [Google Play Store](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.reveal)
- Seeing AI - Microsoft. (n.d.). *An App for the Blind and Low Vision Community*. Retrieved from [https://www.microsoft.com/en-us/ai/seeing-ai](https://www.microsoft.com/en-us/ai/seeing-ai)
- Smith, R., Antonova, D., & Lee, S. (2009). *Google's Tesseract Optical Character Recognition Engine*. Proceedings of the IEEE Document Analysis and Recognition Conference.
- Huang, X., Baker, J., & Reddy, R. (2014). *A Historical Perspective of Speech Recognition*. Communications of the ACM, 57(1), 94-103.
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press.
- Huang, J., & Wang, Y. (2021). *Text-to-Speech Synthesis with Neural Networks*. Journal of Artificial Intelligence Research, 64, 123-145.
- Azure Cognitive Services. (n.d.). *Text-to-Speech API*. Retrieved from [https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/](https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/)
- Tesseract OCR. (n.d.). *An Open-Source OCR Engine Developed by Google*. Retrieved from [https://github.com/tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract)

## Proposed Solution

The proposed solution is to develop a web application that leverages OCR technology to recognize text from images or documents and convert the text into speech using TTS technology. This application is intended to assist users with partial vision impairments in accessing written information quickly and efficiently.

## Feature Design

| **Feature**                          | **Description**                                                                                                                                                                                                  |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Text Scanning (OCR)**              | Utilizes Optical Character Recognition (OCR) technology to scan text from images or documents and convert it into machine-readable text. Employs an OCR model that supports the Indonesian language.      |
| **Text-to-Speech (TTS)**             | Provides text-to-speech functionality to read the scanned text aloud using natural-sounding voices with adjustable speed. Operates offline with Indonesian language support.                                |
| **Text History Storage**             | Stores a history of scanned text, allowing users to access previously scanned content without the need to re-scan. This feature assists users in retaining important information.                          |
| **Text Contrast Adjustment**         | Offers options to adjust text contrast and size, enhancing readability for users with partial vision impairments.                                                                                                  |
| **Indonesian Language Recognition**  | Employs an AI model to ensure accurate understanding of Indonesian text, including nuances such as accents, spelling, and local language characteristics.                                                      |
| **Image Text Scanning**              | Enables users to scan text from various types of images in their environment.                                                                                                                                    |

## Competitor Analysis

### Competitor 1: ChatGPT
- **Competitor Type:** Indirect Competitor  
- **Product Type:** AI language model that assists in reading text via camera.  
- **Target Customers:** Users who require text-based information.  
- **Advantages:**  
  - Capable of explaining text.  
  - Detects various languages and scripts.  
- **Disadvantages:**  
  - Not specifically designed for users with visual impairments.  
  - Does not provide specialized visual support.  
- **Key Competitive Advantage & Unique Value:**  
  - A sophisticated model with continuous updates, deployable across multiple platforms.

### Competitor 2: Seeing AI
- **Competitor Type:** Direct Competitor  
- **Product Type:** Mobile application integrating OCR, TTS, and additional features such as object recognition, environmental description, and color detection to enhance accessibility for users with visual impairments.  
- **Target Customers:**  
  - Individuals with visual impairments, including those who are blind or have partial vision loss, requiring assistance in reading text, recognizing objects, and understanding their surroundings.  
- **Advantages:**  
  - Free and integrated with the Microsoft ecosystem, ensuring reliability and regular updates.  
  - Multifunctional features, including OCR, TTS, object recognition, and real-time environmental descriptions.  
- **Disadvantages:**  
  - Limited language support: recognition of certain languages or accents may be suboptimal.  
  - Dependency on a stable internet connection for some advanced features.  
- **Key Competitive Advantage & Unique Value:**  
  - Provides a comprehensive solution by integrating multiple supportive features, backed by Microsoft's resources and reliability.

### Competitor 3: Google Lookout
- **Competitor Type:** Direct Competitor  
- **Product Type:** Mobile application utilizing OCR, object recognition, and other accessibility features to assist users with visual impairments in interpreting their surroundings.  
- **Target Customers:**  
  - Individuals with visual impairments, including those who are blind or have partial vision loss.  
  - Android users seeking an integrated accessibility solution for reading text, recognizing objects, and navigating independently.  
- **Advantages:**  
  - Leverages advanced AI and ML technologies, utilizing Google’s infrastructure to achieve high accuracy in text and object recognition.  
  - Seamless integration with the Android ecosystem and other Google services.  
- **Disadvantages:**  
  - Primarily available for Android devices, rendering it inaccessible to iOS users.  
  - Requires a stable internet connection for certain advanced features.  
- **Key Competitive Advantage & Unique Value:**  
  - Utilizes state-of-the-art AI/ML technology from Google, offering exceptional accuracy and speed in text and object recognition, specifically tailored for users with visual impairments.

## Project Team

**Team B1_10:**

- **Muhammad Razza Titian J.** (21/475348/TK/52470)  
  *Project Manager (PM)*

- **Yefta Nathaniel Wibowo** (22/492878/TK/53954)  
  *AI Engineer (AIE), Cloud Engineer (CE)*

- **Reihan Athar Zildaniar** (22/497191/TK/54482)  
  *UI/UX Designer (UXD), Software Engineer (SE)*

**Project:** Senior Project in Information Technology  
**Department:** Department of Electrical Engineering and Information Technology  
**Faculty:** Faculty of Engineering  
**Institution:** Universitas Gadjah Mada


### **Entity relationship diagram**
<img src="./public/e_ERD.png">

### **Low-fidelity Wireframe**
<img src="./public/e_LoFi.png">

### **Gantt-Chart pengerjaan proyek dalam kurun waktu 1 semester**
<img src="./public/e_GanttChart.png">
