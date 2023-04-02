const LoadingSpinner = () => {
    return (
        <svg className="motion-safe:animate-spin h-10 w-10 m-3" viewBox="0 0 24 24">
            <path
                fill="hsl(125,100%,60%)"
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
            />
            <path
                fill="hsl(125,100%,60%)"
                d="M12 6a1 1 0 011 1v5a1 1 0 11-2 0V7a1 1 0 011-1z"
            />
        </svg>
    )
}

export default LoadingSpinner