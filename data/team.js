/**
 * Team Data
 *
 * To add a new team member, add an object to the appropriate category array:
 * {
 *   name: 'Full Name',
 *   dept: 'GSAI' or 'CSE',              // Department
 *   research: 'Research interests',
 *   photo: 'https://...',               // Photo URL
 *   homepage: 'https://...',            // Optional: personal website
 *   scholar: 'https://scholar...'       // Optional: Google Scholar
 * }
 *
 * Categories:
 *   - 'PhD & Combined Students'
 *   - 'MS Students'
 *   - 'Alumni' (optional, can be added if needed)
 */

const TEAM_DATA = {
  'PhD & Combined Students': [
    {
      name: 'Moonjeong Park',
      dept: 'GSAI',
      research: 'Graph Neural Networks, Dynamical Systems',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/mjpark_profile.jpeg',
      homepage: 'https://jeong27.github.io/',
      scholar: 'https://scholar.google.com/citations?user=EY_FX_sAAAAJ'
    },
    {
      name: 'Seungbeom Lee',
      dept: 'GSAI',
      research: 'Geometric Deep Learning, ML for Biology',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/sblee_profile.jpg'
    },
    {
      name: 'Seunghyuk Cho',
      dept: 'GSAI',
      research: 'Generative Models, Riemannian Geometry',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/shcho_profile.jpg',
      homepage: 'https://seunghyukcho.github.io',
      scholar: 'https://scholar.google.com/citations?hl=en&user=4OOM9_cAAAAJ'
    },
    {
      name: 'Jaeseung Heo',
      dept: 'GSAI',
      research: 'Graph Neural Networks, Data-Centric AI',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/jsheo_profile.jpg'
    },
    {
      name: 'Saemi Moon',
      dept: 'CSE',
      research: 'Trustworthy AI',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/smmoon_profile.jpeg',
      homepage: 'https://saemi410.github.io/',
      scholar: 'https://scholar.google.com/citations?user=FKyWiZMAAAAJ'
    },
    {
      name: 'Youngbin Choi',
      dept: 'CSE',
      research: 'LLM Personalization',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/ybchoi_profile.jpg',
      scholar: 'https://scholar.google.com/citations?user=oh2ATg8AAAAJ'
    },
    {
      name: 'Minjong Lee',
      dept: 'CSE',
      research: 'Generative Models',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/minjonglee_profile.jpg',
      homepage: 'https://minjong-lee.github.io/',
      scholar: 'https://scholar.google.com/citations?hl=en&user=peXGkQwAAAAJ'
    },
    {
      name: 'Kyeongheung Yun',
      dept: 'CSE',
      research: 'Graph Neural Networks',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/khyun_profile.jpg'
    },
    {
      name: 'Seokwon Yoon',
      dept: 'CSE',
      research: 'Machine Learning',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/swyoon_profile.JPG'
    },
    {
      name: 'Chongtae Ahn',
      dept: 'GSAI',
      research: 'Machine Learning (Industrial PhD from POSCO)',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/chongtaeahn_profile.jpg'
    }
  ],

  'MS Students': [
    {
      name: 'Yesong Ko',
      dept: 'CSE',
      research: 'Machine Learning',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/ysko_profile.png'
    },
    {
      name: 'Sunghyun Choi',
      dept: 'GSAI',
      research: 'Machine Learning, Generative Models',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/shchoi_profile.jpg'
    }
  ]
};
