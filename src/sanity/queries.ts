import { defineQuery } from "next-sanity";

export const PORTFOLIO_PAGE_QUERY = defineQuery(`{
  "profile": *[_type == "profile"][0]{
    _id,
    name,
    title,
    focus,
    headline,
    bio,
    location,
    availability,
    profileImage {
      asset,
      alt
    },
    stats[] {
      _key,
      value,
      label
    },
    heroChips,
    socialLinks {
      github,
      linkedin,
      whatsapp,
      email
    }
  },
  "projects": *[_type == "project" && defined(slug.current)] | order(coalesce(order, 100) asc, publishedAt desc, _createdAt desc){
    _id,
    title,
    slug,
    tagline,
    order,
    coverImage {
      asset,
      alt
    },
    overview,
    technologies,
    siteUrl,
    githubUrl,
    publishedAt
  },
  "experiences": *[_type == "experience"] | order(order asc){
    _id,
    company,
    role,
    isCurrent,
    period,
    location,
    technologies,
    responsibilities,
    order
  },
  "skills": *[_type == "skillCategory"] | order(order asc){
    _id,
    title,
    order,
    skills[] {
      _key,
      name,
      isPrimary
    }
  },
  "education": *[_type == "education"] | order(order asc){
    _id,
    degree,
    institution,
    honors,
    gpa,
    period,
    order
  }
}`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    tagline,
    coverImage {
      asset,
      alt
    },
    overview,
    technologies,
    siteUrl,
    githubUrl,
    publishedAt
  }
`);
