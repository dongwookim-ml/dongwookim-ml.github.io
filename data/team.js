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
 *   scholar: 'https://scholar...',      // Optional: Google Scholar
 *   avatar: {hair: 'short', ...}        // Optional: pixel portrait on the interactive page, drawn after
 *                                       // the photo; the fields are listed above portrait() in js/interactive.js
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
      scholar: 'https://scholar.google.com/citations?user=EY_FX_sAAAAJ',
      avatar: {hair: 'long', hairColor: '#3d2c26', part: 12, top: 'jacket', topColor: '#d9c7ad', bg: '#f3dfc6', smile: true}
    },
    {
      name: 'Seungbeom Lee',
      dept: 'GSAI',
      research: 'Geometric Deep Learning, ML for Biology',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/sblee_profile.jpg',
      avatar: {hair: 'fringe', hairColor: '#2b2630', top: 'shirt', topColor: '#9bb7cf', inner: '#b7cde0', bg: '#eef1f4'}
    },
    {
      name: 'Seunghyuk Cho',
      dept: 'GSAI',
      research: 'Generative Models, Riemannian Geometry',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/shcho_profile.jpg',
      homepage: 'https://seunghyukcho.github.io',
      scholar: 'https://scholar.google.com/citations?hl=en&user=4OOM9_cAAAAJ',
      avatar: {hair: 'fringe', hairColor: '#2b2630', top: 'knit', topColor: '#c9a77c', bg: '#f0e2cf'}
    },
    {
      name: 'Jaeseung Heo',
      dept: 'GSAI',
      research: 'Graph Neural Networks, Data-Centric AI',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/jsheo_profile.jpg',
      homepage: 'https://jason9464.github.io/',
      scholar: 'https://scholar.google.com/citations?user=OiDlGBwAAAAJ',
      avatar: {hair: 'curly', hairColor: '#2b2630', top: 'jacket', topColor: '#24232a', bg: '#e9dccb'}
    },
    {
      name: 'Saemi Moon',
      dept: 'CSE',
      research: 'Trustworthy AI',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/smmoon_profile.jpeg',
      homepage: 'https://saemi410.github.io/',
      scholar: 'https://scholar.google.com/citations?user=FKyWiZMAAAAJ',
      avatar: {hair: 'longBangs', hairColor: '#2b2630', top: 'tee', topColor: '#2b2630', bg: '#f2f2f2', smile: true}
    },
    {
      name: 'Youngbin Choi',
      dept: 'GSAI',
      research: 'LLM Personalization',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/ybchoi_profile.jpg',
      homepage: 'https://youngbin4979.github.io/',
      scholar: 'https://scholar.google.com/citations?user=oh2ATg8AAAAJ',
      avatar: {hair: 'side', hairColor: '#3d2c26', top: 'shirt', topColor: '#efb7c2', inner: '#f6d3db', bg: '#f4f0f0'}
    },
    {
      name: 'Minjong Lee',
      dept: 'CSE',
      research: 'Generative Models',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/minjonglee_profile.jpg',
      homepage: 'https://minjong-lee.github.io/',
      scholar: 'https://scholar.google.com/citations?hl=en&user=peXGkQwAAAAJ',
      avatar: {hair: 'fringe', hairColor: '#2b2630', glasses: {color: '#2b2630'}, top: 'tee', topColor: '#6b3b33', bg: '#eef1f4'}
    },
    {
      name: 'Kyeongheung Yun',
      dept: 'CSE',
      research: 'Graph Neural Networks',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/khyun_profile.jpg',
      avatar: {hair: 'short', hairColor: '#2b2630', top: 'tee', topColor: '#f4f4f2', bg: '#e7ecef', round: true}
    },
    {
      name: 'Seokwon Yoon',
      dept: 'CSE',
      research: 'Machine Learning',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/swyoon_profile.JPG',
      avatar: {hair: 'side', hairColor: '#5b3d2e', top: 'knit', topColor: '#22394a', bg: '#f2f2f2'}
    },
    {
      name: 'Chongtae Ahn',
      dept: 'GSAI',
      research: 'Machine Learning (Industrial PhD from POSCO)',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/chongtaeahn_profile.jpg',
      avatar: {hair: 'fringe', hairColor: '#2b2630', top: 'plaid', topColor: '#c8b29b', inner: '#f4efe8', bg: '#e3e3e1'}
    }
  ],

  'MS Students': [
    {
      name: 'Sunghyun Choi',
      dept: 'GSAI',
      research: 'Machine Learning, Generative Models',
      photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/shchoi_profile.jpg',
      avatar: {hair: 'side', hairColor: '#2b2630', top: 'suit', topColor: '#2a2b31', tie: '#3a3a44', bg: '#f2f2f2'}
    },
    {
      name: 'Suhyeon Jun',
      dept: 'CSE',
      research: 'Machine Learning',
      photo: 'https://ml.postech.ac.kr/img/shjun_profile.jpg',
      homepage: 'https://sooh-j.github.io/',
      avatar: {hair: 'bob', hairColor: '#3d2c26', top: 'tee', topColor: '#24232a', bg: '#e6e3f2'}
    },
    {
      name: 'Seoyeon Lee',
      dept: 'GSAI',
      research: 'Machine Learning',
      photo: 'https://ml.postech.ac.kr/img/sylee_profile.jpeg',
      homepage: 'https://seoyeomm.github.io/',
      avatar: {hair: 'long', hairColor: '#2b2630', top: 'jacket', topColor: '#24232a', bg: '#f2f2f2'}
    }
  ],

  'Alumni': [
    {
      name: 'Yesong Ko',
      dept: 'MS 2025',
      photo: 'https://ml.postech.ac.kr/img/ysko_profile.png',
      avatar: {hair: 'long', hairColor: '#3d2c26', top: 'tee', topColor: '#2b2b33', bg: '#f2f2f2'}
    },
    {
      name: 'Munsun Jo',
      dept: 'MS 2025',
      photo: 'https://ml.postech.ac.kr/img/msjo_profile.png',
      avatar: {hair: 'longWavy', hairColor: '#5b3d2e', part: 11, top: 'tee', topColor: '#24232a', bg: '#ebe9e8'}
    },
    {
      name: 'Jinho Park',
      dept: 'MS 2023',
      photo: 'https://ml.postech.ac.kr/img/jhpark_profile.png',
      avatar: {hair: 'fringe', hairColor: '#2b2630', top: 'tee', topColor: '#22314d', bg: '#f2f2f2', round: true}
    },
    {
      name: 'Dain Kim',
      dept: 'MS 2023',
      photo: 'https://ml.postech.ac.kr/img/dikim_profile.png',
      avatar: {hair: 'long', hairColor: '#2b2630', part: 11, top: 'knit', topColor: '#8d8d93', bg: '#f2f2f2'}
    },
    {
      name: 'Jinhyeok Park',
      dept: 'MS 2023',
      photo: 'https://ml.postech.ac.kr/img/jinhyeokpark_profile.jpg',
      avatar: {hair: 'bowl', hairColor: '#5b3d2e', glasses: {color: '#7d6a52', round: true}, top: 'tee', topColor: '#8a6a55', bg: '#f2f2f2'}
    },
    {
      name: 'Myeonghyeon Kim',
      dept: 'MS 2022',
      photo: 'https://ml.postech.ac.kr/img/mhkim_profile.jpg',
      avatar: {hair: 'fringe', hairColor: '#2b2630', top: 'shirt', topColor: '#b9d6ea', inner: '#d6e7f3', bg: '#f2f2f2'}
    }
  ]
};
