declare global {
  namespace Models {
    interface Job {
      id: number
      jid: string
      applyEmail: string | null
      applyUrl: string | null
      companyName: string | null
      descriptionAsHTML: string
      epoch: number
      datePosted: string
      featured: boolean
      title: string
      createdAt: Date
      updatedAt: Date
      urlSlug?: string
      daysSinceEpoch?: number
    }

    interface JobWithRelations extends Job {
      category: Category
      location: Location
      tags: Tag[]
    }

    interface Category {
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }

    interface Location {
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }

    interface Tag {
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
