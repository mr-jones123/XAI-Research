"use client"

import { Search } from "lucide-react"

export default function LoadingWebSearch() {
  return (
    <div className="bg-gray-200 text-gray-900 max-w-md p-4 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="w-6 h-6 text-blue-600 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Searching the web</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1">Finding related sources and information...</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="h-2 bg-gray-300 rounded animate-pulse flex-1"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "500ms" }}></div>
          <div className="h-2 bg-gray-300 rounded animate-pulse flex-1" style={{ animationDelay: "500ms" }}></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "1000ms" }}></div>
          <div className="h-2 bg-gray-300 rounded animate-pulse flex-1" style={{ animationDelay: "1000ms" }}></div>
        </div>
      </div>
    </div>
  )
}
