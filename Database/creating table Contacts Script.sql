USE [Database]
GO

/****** Object:  Table [dbo].[Contacts]    Script Date: 17.07.2016 15:35:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](100) NOT NULL,
	[Address] [nvarchar](100) NULL,
	[Position] [nvarchar](100) NOT NULL,
	[Salary] [int] NOT NULL,
	[BirthDate] [date] NOT NULL,
 CONSTRAINT [PK_Contacts_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


