/**
 * Publications Data (Recent 3 Years)
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
      title: 'Influence Functions for Edge Edits in Non-Convex GNNs',
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
      title: 'RAG with Estimation of Source Reliability',
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
      title: 'Holistic Unlearning Benchmark for Text-to-Image Diffusion Models',
      authors: 'Saemi Moon*, Minjong Lee*, Sangdon Park, Dongwoo Kim',
      venue: 'ICCV',
      arxiv: 'https://arxiv.org/abs/2410.05664',
      github: 'https://github.com/ml-postech/HUB'
    },
    {
      title: 'Enhancing Ligand Validity and Affinity with Multi-Reward Optimization',
      authors: 'Seungbeom Lee*, Munsun Jo*, Jungseul Ok, Dongwoo Kim',
      venue: 'ICML',
      pdf: 'https://openreview.net/pdf?id=gmFeso9sXJ'
    },
    {
      title: 'Towards Bridging Generalization and Expressivity of GNNs',
      authors: 'Shouheng Li, Floris Geerts, Dongwoo Kim, Qing Wang',
      venue: 'ICLR',
      arxiv: 'https://arxiv.org/abs/2410.10051'
    }
  ],

  '2024': [
    {
      title: 'Mitigating Over-smoothing through Reverse Process GNN',
      authors: 'MoonJeong Park, Jaeseung Heo, Dongwoo Kim',
      venue: 'ICML',
      arxiv: 'https://arxiv.org/abs/2403.10543'
    },
    {
      title: 'EPIC: Graph Augmentation with Edit Path Interpolation',
      authors: 'Jaeseung Heo*, Seungbeom Lee*, Sungsoo Ahn, Dongwoo Kim',
      venue: 'IJCAI',
      arxiv: 'https://arxiv.org/abs/2306.01310'
    },
    {
      title: 'Few-shot Unlearning',
      authors: 'Youngsik Yoon*, Jinhwan Nam*, Jaeho Lee, Dongwoo Kim, Jungseul Ok',
      venue: 'IEEE S&P',
      arxiv: 'https://arxiv.org/abs/2205.15567'
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
      arxiv: 'https://arxiv.org/abs/2209.15217'
    },
    {
      title: 'Robust Evaluation of Diffusion-Based Adversarial Purification',
      authors: 'Minjong Lee, Dongwoo Kim',
      venue: 'ICCV',
      badge: 'Oral',
      arxiv: 'https://arxiv.org/abs/2303.09051'
    },
    {
      title: 'Local Vertex Colouring Graph Neural Network',
      authors: 'Shouheng Li, Dongwoo Kim, Qing Wang',
      venue: 'ICML',
      pdf: 'https://openreview.net/forum?id=szL4HN4hkH'
    },
    {
      title: 'Restructuring Graph for Higher Homophily',
      authors: 'Shouheng Li, Dongwoo Kim, Qing Wang',
      venue: 'AAAI',
      arxiv: 'https://arxiv.org/abs/2206.02386'
    },
    {
      title: 'Anonymization for Skeleton Action Recognition',
      authors: 'Saemi Moon*, Myeonghyeon Kim*, Zhenyue Qin, Yang Liu, Dongwoo Kim',
      venue: 'AAAI',
      arxiv: 'https://arxiv.org/abs/2111.15129'
    }
  ]
};
