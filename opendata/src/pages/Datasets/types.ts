export type DatasetItem = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  downloadsCount: number;
  organization: {
    _id: string;
    organizationName: string;
    description: string;
    logoUrl: string;
    websiteUrl: string;
    contactEmail: string;
    createdBy: string;
    datasetCount: number;
    createdAt: string;
    updatedAt: string;
  };
  categories: {
    _id: string;
    categoryName: string;
    description: string;
    datasetCount: number;
    createdAt: string;
    updatedAt: string;
  }[];
  tags: {
    _id: string;
    tagName: string;
    datasetCount: number;
    createdAt: string;
    updatedAt: string;
  }[];
  formats: {
    _id: string;
    formatName: string;
    datasetCount: number;
    createdAt: string;
    updatedAt: string;
  }[];
  license: {
    _id: string;
    licenceName: string;
    licenceUrl: string;
    datasetCount: number;
    createdAt: string;
    updatedAt: string;
  };
};
