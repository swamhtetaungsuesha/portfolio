"use client";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";
import { ProjectWithTags } from "@/db/schema";
import Link from "next/link";

const ITEMS_PER_PAGE = 4;
const ProjectsView = (props: { projects: ProjectWithTags[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // This is just example data. In a real application, you might fetch this from an API
  const totalItems = props.projects.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = props.projects.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="grid grid-rows-4 h-5/6">
        {currentItems.map((item, index) => (
          <Link href={item.liveUrl || item.githubUrl} key={item.id}>
            <ProjectCard project={item} index={index + 1} />
          </Link>
        ))}
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProjectsView;
