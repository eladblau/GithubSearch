USE [master]
GO
/****** Object:  Database [GithubSearch]    Script Date: 28/04/2021 21:46:54 ******/
CREATE DATABASE [GithubSearch]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GithubSearch', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\GithubSearch.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GithubSearch_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\GithubSearch_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [GithubSearch] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GithubSearch].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GithubSearch] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GithubSearch] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GithubSearch] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GithubSearch] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GithubSearch] SET ARITHABORT OFF 
GO
ALTER DATABASE [GithubSearch] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GithubSearch] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GithubSearch] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GithubSearch] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GithubSearch] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GithubSearch] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GithubSearch] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GithubSearch] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GithubSearch] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GithubSearch] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GithubSearch] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GithubSearch] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GithubSearch] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GithubSearch] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GithubSearch] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GithubSearch] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GithubSearch] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GithubSearch] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GithubSearch] SET  MULTI_USER 
GO
ALTER DATABASE [GithubSearch] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GithubSearch] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GithubSearch] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GithubSearch] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GithubSearch] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GithubSearch] SET QUERY_STORE = OFF
GO
USE [GithubSearch]
GO
/****** Object:  Table [dbo].[Favorites]    Script Date: 28/04/2021 21:46:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favorites](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[repoId] [int] NULL,
	[username] [nvarchar](300) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[usp_DeleteUserFavorite]    Script Date: 28/04/2021 21:46:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_DeleteUserFavorite]
	@repoId int
	,@username nvarchar(300) = NULL

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


	DELETE FROM [dbo].[Favorites]
      WHERE repoId = @repoId
		AND (username = @username OR @username IS NULL)



END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserFavorites]    Script Date: 28/04/2021 21:46:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_GetUserFavorites]
	
	@username nvarchar(300) = NULL

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


	SELECT *
	FROM [dbo].Favorites f
	WHERE (f.username = @username) OR @username IS NULL



END
GO
/****** Object:  StoredProcedure [dbo].[usp_InsertFavorite]    Script Date: 28/04/2021 21:46:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_InsertFavorite]
	
	@repoId int
	,@username nvarchar(300) = NULL

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


	INSERT INTO [dbo].[Favorites]
           ([repoId]
           ,[username])
     VALUES
           (@repoId
		   ,@username)




END
GO
USE [master]
GO
ALTER DATABASE [GithubSearch] SET  READ_WRITE 
GO
