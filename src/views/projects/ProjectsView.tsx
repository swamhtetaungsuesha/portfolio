"use client";
import Pagination from "./Pagination";
import ProjectCard from "./ProjectCard";
import { ProjectWithTags } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 4;
const ProjectsView = (props: { projects: ProjectWithTags[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const isMobile = useIsMobile();
  const totalItems = props.projects.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(1);
    } else {
      setItemsPerPage(ITEMS_PER_PAGE);
    }
  }, [isMobile]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.projects.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="grid xl:grid-rows-4 h-5/6">
        {currentItems.map((item, index) => (
          <Link
            href={item.liveUrl || item.githubUrl}
            key={item.id}
            target="_blank"
          >
            <ProjectCard
              project={item}
              index={index + 1 + itemsPerPage * (currentPage - 1)}
            />
          </Link>
        ))}
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProjectsView;
