IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Estudiantes] (
    [Id] uniqueidentifier NOT NULL,
    [Nombre] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_Estudiantes] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Profesores] (
    [Id] uniqueidentifier NOT NULL,
    [Nombre] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_Profesores] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Notas] (
    [Id] uniqueidentifier NOT NULL,
    [Nombre] nvarchar(100) NOT NULL,
    [Valor] decimal(4,2) NOT NULL,
    [EstudianteId] uniqueidentifier NOT NULL,
    [ProfesorId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_Notas] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Notas_Estudiantes_EstudianteId] FOREIGN KEY ([EstudianteId]) REFERENCES [Estudiantes] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Notas_Profesores_ProfesorId] FOREIGN KEY ([ProfesorId]) REFERENCES [Profesores] ([Id]) ON DELETE NO ACTION
);
GO

CREATE INDEX [IX_Notas_EstudianteId] ON [Notas] ([EstudianteId]);
GO

CREATE INDEX [IX_Notas_ProfesorId] ON [Notas] ([ProfesorId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260116022443_InitialCreate', N'8.0.0');
GO

COMMIT;
GO

