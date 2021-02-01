declare global {
  interface Category {
    id: number
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
  }

  interface Location {
    id: number
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
  }

  interface Tag {
    id?: number
    name: string
    slug: string
    createdAt?: Date
    updatedAt?: Date
  }

  interface Type {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
  }

  interface Job {
    id?: number
    jid: string
    applyCTA: string
    companyName: string | null
    descriptionAsHTML: string
    createdEpoch: number
    expiresEpoch?: number
    datePosted?: string
    featured: boolean
    title: string
    createdAt?: Date
    updatedAt?: Date
    urlSlug?: string
    salaryCurrency?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    daysSinceEpoch?: number
  }
  interface JobWithRelations extends Models.Job {
    location: Location
    category: Category
    tags: Tag[]
    type: Type
  }
  namespace Models {
    interface Job {
      id?: number
      jid: string
      applyCTA: string
      companyName: string | null
      descriptionAsHTML: string
      createdEpoch: number
      expiresEpoch?: number
      datePosted?: string
      featured: boolean
      title: string
      createdAt?: Date
      updatedAt?: Date
      urlSlug?: string
      salaryCurrency?: string | null
      salaryMin?: number | null
      salaryMax?: number | null
      daysSinceEpoch?: number
    }

    interface JobWithRelations extends Job {
      category: Category
      location: Location
      type: Type
      tags: Tag[]
    }

    interface Category {
      id: number
      name: string
      slug: string
      createdAt: Date
      updatedAt: Date
    }

    interface Location {
      id: number
      name: string
      slug: string
      createdAt: Date
      updatedAt: Date
    }

    interface Tag {
      id?: number
      name: string
      slug: string
      createdAt?: Date
      updatedAt?: Date
    }

    interface Type {
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }

    interface Company {
      id: number
      cid: string
      email: string
      descriptionAsHTML?: string
      headquarters: string
      logoUrl?: string
      name: string
      statement?: string
      verified: boolean
      websiteUrl: string
      jobs: Job[]
      createdAt: Date
      updatedAt: Date
    }
  }
}

export {}
