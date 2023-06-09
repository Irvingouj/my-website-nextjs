export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          author_id: string
          content: string
          id: number
          published_date: string | null
          title: string
        }
        Insert: {
          author_id: string
          content: string
          id?: number
          published_date?: string | null
          title: string
        }
        Update: {
          author_id?: string
          content?: string
          id?: number
          published_date?: string | null
          title?: string
        }
      }
      blogs_tags: {
        Row: {
          blog_id: number
          tag_id: number
        }
        Insert: {
          blog_id: number
          tag_id: number
        }
        Update: {
          blog_id?: number
          tag_id?: number
        }
      }
      blogtags: {
        Row: {
          blogid: number | null
          id: number
          tag: string | null
        }
        Insert: {
          blogid?: number | null
          id?: number
          tag?: string | null
        }
        Update: {
          blogid?: number | null
          id?: number
          tag?: string | null
        }
      }
      comments: {
        Row: {
          author_id: string
          blog_id: number | null
          content: string
          id: number
          posted_date: string | null
        }
        Insert: {
          author_id: string
          blog_id?: number | null
          content: string
          id?: number
          posted_date?: string | null
        }
        Update: {
          author_id?: string
          blog_id?: number | null
          content?: string
          id?: number
          posted_date?: string | null
        }
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
