export interface VideoList {
    page: number;
    limit: number;
    explicit: boolean;
    total: number;
    has_more: boolean;
    list: Video[];
  }
  
export interface Video {
    id: string;
    title: string;
    channel: string;
    owner: string;
  }

// export interface Video {
//     id: string;
//     video_url: string;
//     name: string;
//     description: string;
//     duration: string;
//     created_by: string;
//     image: string;
//     thumbnail: string;
//     cropped: string;
//     file_name_original: string;
//     popularity: string;
//     category_id: string;
//     category: string;
//     keywords: string;
//   }