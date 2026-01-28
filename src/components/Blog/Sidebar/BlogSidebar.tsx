import React from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarPost from "./SidebarPost";
import SidebarCategories from "./SidebarCategories";
import SidebarTags from "./SidebarTags";

const BlogSidebar = () => {
  return (
    <div className="bd-blog-sidebar-wrapper mb-60">
      <SidebarSearch />
      <SidebarPost />
      <SidebarCategories />
      <SidebarTags />
    </div>
  );
};

export default BlogSidebar;
