/**
 * Publications Data
 *
 * To add a new publication, add an object to the appropriate year array:
 * {
 *   title: 'Paper Title',
 *   authors: 'Author1, Author2, Author3',  // Use * for equal contribution
 *   venue: 'VENUE',                         // e.g., 'NeurIPS', 'ICML', 'ICLR'
 *   badge: 'Spotlight',                     // Optional: 'Spotlight', 'Oral', 'Best Paper'
 *   arxiv: 'https://arxiv.org/abs/...',     // Optional
 *   pdf: 'https://...',                     // Optional
 *   github: 'https://github.com/...',       // Optional
 *   project: 'https://...'                  // Optional: project page
 * }
 *
 * To add a new year, add a new key to PUBLICATIONS_DATA object.
 */

const PUBLICATIONS_DATA = {
  '2025': [
    {
      title: 'High-order Equivariant Flow Matching for DFT Hamiltonian Prediction',
      authors: 'Seongsu Kim, Nayoung Kim, Dongwoo Kim, Sungsoo Ahn',
      venue: 'NeurIPS',
      badge: 'Spotlight',
      arxiv: 'https://arxiv.org/abs/2505.18817'
    },
    {
      title: 'Influence Functions for Edge Edits in Non-Convex Graph Neural Networks',
      authors: 'Jaeseung Heo, Kyeongheung Yun, Seokwon Yoon, MoonJeong Park, Jungseul Ok, Dongwoo Kim',
      venue: 'NeurIPS',
      arxiv: 'https://arxiv.org/abs/2506.04694'
    },
    {
      title: 'CoPL: Collaborative Preference Learning for Personalizing LLMs',
      authors: 'Youngbin Choi, Seunghyuk Cho, Minjong Lee, MoonJeong Park, Yesong Ko, Jungseul Ok, Dongwoo Kim',
      venue: 'EMNLP',
      arxiv: 'https://arxiv.org/abs/2503.01658'
    },
    {
      title: 'Retrieval-Augmented Generation with Estimation of Source Reliability',
      authors: 'Jeongyeon Hwang, Junyoung Park, Hyejin Park, Dongwoo Kim, Sangdon Park, Jungseul Ok',
      venue: 'EMNLP',
      arxiv: 'https://arxiv.org/abs/2410.22954'
    },
    {
      title: 'GeoDANO: Geometric VLM with Domain Agnostic Vision Encoder',
      authors: 'Seunghyuk Cho, Zhenyue Qin, Yang Liu, Youngbin Choi, Seungbeom Lee, Dongwoo Kim',
      venue: 'EMNLP Findings',
      arxiv: 'https://arxiv.org/abs/2502.11360'
    },
    {
      title: 'ChronoBias: A Benchmark for Evaluating Temporal Group Bias in RAG',
      authors: 'Kyungmin Kim, Youngbin Choi, Hyounghun Kim, Dongwoo Kim, Sangdon Park',
      venue: 'EMNLP Findings'
    },
    {
      title: 'Holistic Unlearning Benchmark for Text-to-Image Diffusion Models',
      authors: 'Saemi Moon*, Minjong Lee*, Sangdon Park, Dongwoo Kim',
      venue: 'ICCV',
      arxiv: 'https://arxiv.org/abs/2410.05664',
      github: 'https://github.com/ml-postech/HUB',
      project: 'https://saemi410.github.io/HUB/'
    },
    {
      title: 'Delving into Instance-Dependent Label Noise in Graph Data',
      authors: 'Suyeon Kim, SeongKu Kang, Dongwoo Kim, Jungseul Ok, Hwanjo Yu',
      venue: 'KDD'
    },
    {
      title: 'Enhancing Ligand Validity and Affinity with Multi-Reward Optimization',
      authors: 'Seungbeom Lee*, Munsun Jo*, Jungseul Ok, Dongwoo Kim',
      venue: 'ICML',
      pdf: 'https://openreview.net/pdf?id=gmFeso9sXJ'
    },
    {
      title: 'Towards Bridging Generalization and Expressivity of Graph Neural Networks',
      authors: 'Shouheng Li, Floris Geerts, Dongwoo Kim, Qing Wang',
      venue: 'ICLR',
      arxiv: 'https://arxiv.org/abs/2410.10051'
    }
  ],

  '2024': [
    {
      title: 'Mitigating Over-smoothing through Reverse Process GNN for Heterophilic Graphs',
      authors: 'MoonJeong Park, Jaeseung Heo, Dongwoo Kim',
      venue: 'ICML',
      arxiv: 'https://arxiv.org/abs/2403.10543'
    },
    {
      title: 'EPIC: Graph Augmentation with Edit Path Interpolation via Learnable Cost',
      authors: 'Jaeseung Heo*, Seungbeom Lee*, Sungsoo Ahn, Dongwoo Kim',
      venue: 'IJCAI',
      arxiv: 'https://arxiv.org/abs/2306.01310'
    },
    {
      title: 'Few-shot Unlearning',
      authors: 'Youngsik Yoon*, Jinhwan Nam*, Jaeho Lee, Dongwoo Kim, Jungseul Ok',
      venue: 'IEEE S&P',
      arxiv: 'https://arxiv.org/abs/2205.15567',
      github: 'https://github.com/ml-postech/Few-shot-Unlearning'
    },
    {
      title: 'Position-Sensing Graph Neural Networks',
      authors: 'Zhenyue Qin, Saeed Anwar, Dongwoo Kim, Yang Liu, Pan Ji, Tom Gedeon',
      venue: 'TNNLS'
    },
    {
      title: 'Hierarchical Graph Generation with K2-trees',
      authors: 'Yunhui Jang, Dongwoo Kim, Sungsoo Ahn',
      venue: 'ICLR',
      arxiv: 'https://arxiv.org/abs/2305.19125'
    },
    {
      title: 'Feature Unlearning for Pre-trained GANs and VAEs',
      authors: 'Saemi Moon, Seunghyuk Cho, Dongwoo Kim',
      venue: 'AAAI',
      arxiv: 'https://arxiv.org/abs/2303.05699'
    }
  ],

  '2023': [
    {
      title: 'Hyperbolic VAE via Latent Gaussian Distributions',
      authors: 'Seunghyuk Cho, Juyong Lee, Dongwoo Kim',
      venue: 'NeurIPS',
      arxiv: 'https://arxiv.org/abs/2209.15217',
      github: 'https://github.com/ml-postech/GM-VAE'
    },
    {
      title: 'Test-time Embedding Normalization for Popularity Bias Mitigation',
      authors: 'Dain Kim*, Jinhyeok Park*, Dongwoo Kim',
      venue: 'CIKM',
      arxiv: 'https://arxiv.org/abs/2308.11288',
      github: 'https://github.com/ml-postech/TTEN'
    },
    {
      title: 'Robust Evaluation of Diffusion-Based Adversarial Purification',
      authors: 'Minjong Lee, Dongwoo Kim',
      venue: 'ICCV',
      badge: 'Oral',
      arxiv: 'https://arxiv.org/abs/2303.09051',
      github: 'https://github.com/ml-postech/robust-evaluation-of-diffusion-based-purification'
    },
    {
      title: 'Local Vertex Colouring Graph Neural Network',
      authors: 'Shouheng Li, Dongwoo Kim, Qing Wang',
      venue: 'ICML',
      pdf: 'https://openreview.net/forum?id=szL4HN4hkH'
    },
    {
      title: 'Restructuring Graph for Higher Homophily via Learnable Spectral Clustering',
      authors: 'Shouheng Li, Dongwoo Kim, Qing Wang',
      venue: 'AAAI',
      arxiv: 'https://arxiv.org/abs/2206.02386'
    },
    {
      title: 'Anonymization for Skeleton Action Recognition',
      authors: 'Saemi Moon*, Myeonghyeon Kim*, Zhenyue Qin, Yang Liu, Dongwoo Kim',
      venue: 'AAAI',
      arxiv: 'https://arxiv.org/abs/2111.15129',
      github: 'https://github.com/ml-postech/Skeleton-anonymization'
    }
  ],

  '2022': [
    {
      title: 'A Rotated Hyperbolic Wrapped Normal Distribution for Hierarchical Representation Learning',
      authors: 'Seunghyuk Cho, Juyong Lee, Jaesik Park, Dongwoo Kim',
      venue: 'NeurIPS',
      arxiv: 'https://arxiv.org/abs/2205.13371',
      github: 'https://github.com/ml-postech/RoWN'
    },
    {
      title: 'Fusing Higher-Order Features in Graph Neural Networks for Skeleton-Based Action Recognition',
      authors: 'Zhenyue Qin, Yang Liu, Pan Ji, Dongwoo Kim, Lei Wang, Bob McKay, Saeed Anwar, Tom Gedeon',
      venue: 'TNNLS'
    },
    {
      title: 'MetaSSD: Meta-Learned Self-Supervised Detection',
      authors: 'MoonJeong Park, Jungseul Ok, Yo-Seb Jeon, Dongwoo Kim',
      venue: 'ISIT',
      arxiv: 'https://arxiv.org/abs/2205.15271',
      github: 'https://github.com/ml-postech/MetaSSD'
    },
    {
      title: 'Robust Deep Learning from Crowds with Belief Propagation',
      authors: 'Hoyoung Kim*, Seunghyuk Cho*, Dongwoo Kim, Jungseul Ok',
      venue: 'AISTATS',
      arxiv: 'https://arxiv.org/abs/2111.00734'
    },
    {
      title: 'Item-based Variational Auto-encoder for Fair Music Recommendation',
      authors: 'Jinhyeok Park*, Dain Kim*, Dongwoo Kim',
      venue: 'CIKM EvalRS',
      badge: 'Best Paper',
      pdf: 'https://github.com/RecList/evalRS-CIKM-2022/blob/main/final_papers/EvalRS2022_paper_5248.pdf'
    }
  ]
};
