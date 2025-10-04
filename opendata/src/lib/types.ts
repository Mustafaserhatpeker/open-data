// 📄 Resource (bir dataset’in içinde yer alan dosya veya bağlantı)
export interface Resource {
    id: string
    name: string
    description?: string
    url: string
    format: string
    size?: number
    createdAt: string
    updatedAt?: string
}

// 🏢 Organization (veri yükleyen kurum)
export interface Organization {
    id: string
    name: string
    description: string
    logoUrl?: string
    website?: string
    contactEmail?: string
    datasetsCount: number
    followersCount?: number
    createdAt: string
    updatedAt?: string
}

// 🗂️ Category (veri setinin kategorisi)
export interface Category {
    id: string
    name: string
    description?: string
    datasetsCount: number
    createdAt?: string
    updatedAt?: string
}

// 🏷️ Tag (etiket)
export interface Tag {
    id: string
    name: string
    description?: string
    datasetsCount: number
    createdAt?: string
}

// 📄 Format (dosya tipi)
export interface Format {
    id: string
    name: string
    mimeType?: string
    datasetsCount: number
}

// 👤 User (veri yükleyen veya düzenleyen kişi)
export interface User {
    id: string
    username: string
    fullName: string
    avatarUrl?: string
    role: "admin" | "editor" | "viewer"
    organizationId?: string
    joinedAt: string
}

// 📦 Dataset (ana veri nesnesi)
export interface Dataset {
    id: string
    title: string
    description: string
    organizationId: string
    organization?: Organization
    categories: string[] // id referansları
    tags: string[]
    formats: string[]
    resources: Resource[]
    createdBy: string // user id
    createdAt: string
    updatedAt: string
    isOpenData: boolean
    license: string
    version?: string
    viewsCount?: number
    downloadsCount?: number
    followersCount?: number
}
